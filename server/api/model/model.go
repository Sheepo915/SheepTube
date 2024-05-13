package model

import (
	"time"

	"github.com/google/uuid"
)

type UserSubscription struct {
	ID       uuid.UUID
	Channels []Channel
}

type Channel struct {
	ID           uuid.UUID
	Name         string
	Description  string
	Subscriber   int64
	Visibility   bool
	CoverPicture string
	CreatedAt    time.Time
	Owner        uuid.UUID
}

type Video struct {
	ID          uuid.UUID
	Title       string
	Description string
	Visibility  bool
	Thumbnail   string
	UploadedAt  time.Time
	UpdatedAt   time.Time
}

type VideoMetadata struct {
	ID         uuid.UUID
	Categories []Category
	Length     int64
	Views      int64
	Likes      int64
	Dislikes   int64
	Shares     int64
}

type Category struct {
	ID          uuid.UUID
	Title       string
	Description string
}
