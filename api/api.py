from typing import List
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import get_object_or_404
from django.http import HttpRequest
from ninja import NinjaAPI, pagination
from ninja.pagination import PageNumberPagination, paginate
from ninja.security import django_auth
from .models import User, Post, Like, Follow
from .schemas import (
    UserIn, UserOut, PostIn, PostOut, LikeOut, FollowOut, 
    ErrorResponse, SuccessResponse, PaginatedPostsOut
)

api = NinjaAPI(title="Social Media API", version="1.0.0")

# Authentication
@api.post("/login/", response={200: UserOut, 401: ErrorResponse})
def login_user(request, username: str, password: str):
    user = authenticate(username=username, password=password)
    if user is not None:
        login(request, user)
        return 200, UserOut(
            id=user.id,
            username=user.username,
            email=user.email,
            bio=user.bio,
            profile_picture=user.profile_picture,
            follower_count=user.follower_count(),
            following_count=user.following_count(),
            date_joined=user.date_joined
        )
    return 401, {"detail": "Invalid credentials"}

@api.post("/logout/", response={200: SuccessResponse})
def logout_user(request):
    logout(request)
    return {"status": "logged out"}

# Users
@api.get("/users/", response=List[UserOut])
def get_users(request):
    users = User.objects.all()
    return [
        UserOut(
            id=user.id,
            username=user.username,
            email=user.email,
            bio=user.bio,
            profile_picture=user.profile_picture,
            follower_count=user.follower_count(),
            following_count=user.following_count(),
            date_joined=user.date_joined
        ) for user in users
    ]

@api.get("/users/{user_id}/", response={200: UserOut, 404: ErrorResponse})
def get_user(request, user_id: int):
    user = get_object_or_404(User, id=user_id)
    return 200, UserOut(
        id=user.id,
        username=user.username,
        email=user.email,
        bio=user.bio,
        profile_picture=user.profile_picture,
        follower_count=user.follower_count(),
        following_count=user.following_count(),
        date_joined=user.date_joined
    )

@api.post("/users/", response={201: UserOut, 400: ErrorResponse})
def create_user(request, user_in: UserIn):
    try:
        # Check if username already exists
        if User.objects.filter(username=user_in.username).exists():
            return 400, {"detail": "Username already exists"}
        
        # Check if email already exists
        if User.objects.filter(email=user_in.email).exists():
            return 400, {"detail": "Email already exists"}
        
        user = User.objects.create_user(
            username=user_in.username,
            email=user_in.email,
            password=user_in.password,
            bio=user_in.bio,
            profile_picture=user_in.profile_picture
        )
        
        return 201, UserOut(
            id=user.id,
            username=user.username,
            email=user.email,
            bio=user.bio,
            profile_picture=user.profile_picture,
            follower_count=user.follower_count(),
            following_count=user.following_count(),
            date_joined=user.date_joined
        )
    except Exception as e:
        return 400, {"detail": str(e)}

# Posts
class PostPagination(PageNumberPagination):
    page_size = 10

@api.get("/posts/", response=List[PostOut])
@paginate(PostPagination)
def get_posts(request):
    posts = Post.objects.all().order_by('-timestamp')
    return [
        PostOut(
            id=post.id,
            user=post.user.id,
            username=post.user.username,
            content=post.content,
            timestamp=post.timestamp,
            updated_at=post.updated_at,
            like_count=post.like_count(),
            is_liked=Like.objects.filter(user=request.user.id, post=post.id).exists() if request.user.is_authenticated else False
        ) for post in posts
    ]

@api.get("/posts/following/", response=List[PostOut], auth=django_auth)
@paginate(PostPagination)
def get_following_posts(request):
    following_users = User.objects.filter(followers__follower=request.user)
    posts = Post.objects.filter(user__in=following_users).order_by('-timestamp')
    return [
        PostOut(
            id=post.id,
            user=post.user.id,
            username=post.user.username,
            content=post.content,
            timestamp=post.timestamp,
            updated_at=post.updated_at,
            like_count=post.like_count(),
            is_liked=Like.objects.filter(user=request.user.id, post=post.id).exists()
        ) for post in posts
    ]

@api.get("/posts/{post_id}/", response={200: PostOut, 404: ErrorResponse})
def get_post(request, post_id: int):
    post = get_object_or_404(Post, id=post_id)
    return 200, PostOut(
        id=post.id,
        user=post.user.id,
        username=post.user.username,
        content=post.content,
        timestamp=post.timestamp,
        updated_at=post.updated_at,
        like_count=post.like_count(),
        is_liked=Like.objects.filter(user=request.user.id, post=post.id).exists() if request.user.is_authenticated else False
    )

@api.post("/posts/", response={201: PostOut, 401: ErrorResponse}, auth=django_auth)
def create_post(request, post_in: PostIn):
    post = Post.objects.create(
        user=request.user,
        content=post_in.content
    )
    
    return 201, PostOut(
        id=post.id,
        user=post.user.id,
        username=post.user.username,
        content=post.content,
        timestamp=post.timestamp,
        updated_at=post.updated_at,
        like_count=post.like_count(),
        is_liked=False
    )

@api.patch("/posts/{post_id}/", response={200: PostOut, 401: ErrorResponse, 403: ErrorResponse, 404: ErrorResponse}, auth=django_auth)
def update_post(request, post_id: int, post_in: PostIn):
    post = get_object_or_404(Post, id=post_id)
    
    # Check if user is the owner of the post
    if post.user.id != request.user.id:
        return 403, {"detail": "You don't have permission to edit this post"}
    
    post.content = post_in.content
    post.save()
    
    return 200, PostOut(
        id=post.id,
        user=post.user.id,
        username=post.user.username,
        content=post.content,
        timestamp=post.timestamp,
        updated_at=post.updated_at,
        like_count=post.like_count(),
        is_liked=Like.objects.filter(user=request.user.id, post=post.id).exists()
    )

@api.delete("/posts/{post_id}/", response={204: None, 401: ErrorResponse, 403: ErrorResponse, 404: ErrorResponse}, auth=django_auth)
def delete_post(request, post_id: int):
    post = get_object_or_404(Post, id=post_id)
    
    # Check if user is the owner of the post
    if post.user.id != request.user.id:
        return 403, {"detail": "You don't have permission to delete this post"}
    
    post.delete()
    return 204, None

# User posts
@api.get("/users/{user_id}/posts/", response=List[PostOut])
@paginate(PostPagination)
def get_user_posts(request, user_id: int):
    user = get_object_or_404(User, id=user_id)
    posts = Post.objects.filter(user=user).order_by('-timestamp')
    return [
        PostOut(
            id=post.id,
            user=post.user.id,
            username=post.user.username,
            content=post.content,
            timestamp=post.timestamp,
            updated_at=post.updated_at,
            like_count=post.like_count(),
            is_liked=Like.objects.filter(user=request.user.id, post=post.id).exists() if request.user.is_authenticated else False
        ) for post in posts
    ]

# Likes
@api.post("/posts/{post_id}/like/", response={201: SuccessResponse, 200: SuccessResponse, 401: ErrorResponse, 404: ErrorResponse}, auth=django_auth)
def like_post(request, post_id: int):
    post = get_object_or_404(Post, id=post_id)
    
    like, created = Like.objects.get_or_create(
        user=request.user,
        post=post
    )
    
    if created:
        return 201, {"status": "liked"}
    return 200, {"status": "already liked"}

@api.delete("/posts/{post_id}/like/", response={204: None, 400: ErrorResponse, 401: ErrorResponse, 404: ErrorResponse}, auth=django_auth)
def unlike_post(request, post_id: int):
    post = get_object_or_404(Post, id=post_id)
    
    like = Like.objects.filter(user=request.user, post=post)
    if like.exists():
        like.delete()
        return 204, None
    return 400, {"detail": "You have not liked this post"}

# Follows
@api.get("/users/{user_id}/followers/", response=List[UserOut])
def get_followers(request, user_id: int):
    user = get_object_or_404(User, id=user_id)
    followers = User.objects.filter(following__followed=user)
    return [
        UserOut(
            id=follower.id,
            username=follower.username,
            email=follower.email,
            bio=follower.bio,
            profile_picture=follower.profile_picture,
            follower_count=follower.follower_count(),
            following_count=follower.following_count(),
            date_joined=follower.date_joined
        ) for follower in followers
    ]

@api.get("/users/{user_id}/following/", response=List[UserOut])
def get_following(request, user_id: int):
    user = get_object_or_404(User, id=user_id)
    following = User.objects.filter(followers__follower=user)
    return [
        UserOut(
            id=followed.id,
            username=followed.username,
            email=followed.email,
            bio=followed.bio,
            profile_picture=followed.profile_picture,
            follower_count=followed.follower_count(),
            following_count=followed.following_count(),
            date_joined=followed.date_joined
        ) for followed in following
    ]

@api.post("/users/{user_id}/follow/", response={201: SuccessResponse, 200: SuccessResponse, 400: ErrorResponse, 401: ErrorResponse, 404: ErrorResponse}, auth=django_auth)
def follow_user(request, user_id: int):
    target_user = get_object_or_404(User, id=user_id)
    
    if request.user.id == target_user.id:
        return 400, {"detail": "You cannot follow yourself"}
    
    follow, created = Follow.objects.get_or_create(
        follower=request.user,
        followed=target_user
    )
    
    if created:
        return 201, {"status": "following"}
    return 200, {"status": "already following"}

@api.delete("/users/{user_id}/follow/", response={204: None, 400: ErrorResponse, 401: ErrorResponse, 404: ErrorResponse}, auth=django_auth)
def unfollow_user(request, user_id: int):
    target_user = get_object_or_404(User, id=user_id)
    
    follow = Follow.objects.filter(follower=request.user, followed=target_user)
    if follow.exists():
        follow.delete()
        return 204, None
    return 400, {"detail": "You are not following this user"}