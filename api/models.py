from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

class User(AbstractUser):
    """
    Extended User model for our social media platform.
    Inherits from Django's AbstractUser which already includes:
    username, email, password, first_name, last_name, etc.
    """
    bio = models.TextField(blank=True)
    profile_picture = models.URLField(blank=True)
    
    def follower_count(self):
        return self.followers.count()
    
    def following_count(self):
        return self.following.count()
    
    def __str__(self):
        return self.username


class Post(models.Model):
    """
    Model representing a user's post.
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def like_count(self):
        return self.likes.count()
    
    class Meta:
        ordering = ['-timestamp']  # Most recent posts first
    
    def __str__(self):
        return f"{self.user.username}: {self.content[:50]}..."


class Like(models.Model):
    """
    Model representing a like on a post.
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_likes")
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="likes")
    timestamp = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('user', 'post')  # A user can like a post only once
    
    def __str__(self):
        return f"{self.user.username} likes {self.post.id}"


class Follow(models.Model):
    """
    Model representing a follow relationship between users.
    """
    follower = models.ForeignKey(User, on_delete=models.CASCADE, related_name="following")
    followed = models.ForeignKey(User, on_delete=models.CASCADE, related_name="followers")
    timestamp = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('follower', 'followed')  # A user can follow another user only once
    
    def __str__(self):
        return f"{self.follower.username} follows {self.followed.username}"