from datetime import datetime
from typing import List, Optional
from ninja import Schema
from pydantic import EmailStr

class UserIn(Schema):
    username: str
    email: EmailStr
    password: str
    bio: Optional[str] = None
    profile_picture: Optional[str] = None

class UserOut(Schema):
    id: int
    username: str
    email: EmailStr
    bio: Optional[str] = None
    profile_picture: Optional[str] = None
    follower_count: int
    following_count: int
    date_joined: datetime

class PostIn(Schema):
    content: str

class PostOut(Schema):
    id: int
    user: int
    username: str
    content: str
    timestamp: datetime
    updated_at: datetime
    like_count: int
    is_liked: bool

class LikeOut(Schema):
    id: int
    user: int
    post: int
    timestamp: datetime

class FollowOut(Schema):
    id: int
    follower: int
    followed: int
    timestamp: datetime

class ErrorResponse(Schema):
    detail: str

class SuccessResponse(Schema):
    status: str

class PaginatedPostsOut(Schema):
    count: int
    next: Optional[str] = None
    previous: Optional[str] = None
    results: List[PostOut]