BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Users] (
    [id] INT NOT NULL IDENTITY(1,1),
    [username] NVARCHAR(100) NOT NULL,
    [email] NVARCHAR(255) NOT NULL,
    [PasswordHash] NVARCHAR(255) NOT NULL,
    [name] NVARCHAR(200) NOT NULL,
    [role] NVARCHAR(50) NOT NULL,
    [IsActive] BIT NOT NULL CONSTRAINT [Users_IsActive_df] DEFAULT 1,
    [CreatedAt] DATETIME2 NOT NULL CONSTRAINT [Users_CreatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [UpdatedAt] DATETIME2 NOT NULL,
    [LastLoginAt] DATETIME2,
    CONSTRAINT [Users_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Users_username_key] UNIQUE NONCLUSTERED ([username]),
    CONSTRAINT [Users_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Categories] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(100) NOT NULL,
    [slug] NVARCHAR(100) NOT NULL,
    [description] NVARCHAR(500),
    [icon] NVARCHAR(50),
    [color] NVARCHAR(20),
    [ImageUrl] NVARCHAR(500),
    [SortOrder] INT NOT NULL CONSTRAINT [Categories_SortOrder_df] DEFAULT 0,
    [IsActive] BIT NOT NULL CONSTRAINT [Categories_IsActive_df] DEFAULT 1,
    [CreatedAt] DATETIME2 NOT NULL CONSTRAINT [Categories_CreatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [UpdatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Categories_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Categories_slug_key] UNIQUE NONCLUSTERED ([slug])
);

-- CreateTable
CREATE TABLE [dbo].[Tutorials] (
    [id] INT NOT NULL IDENTITY(1,1),
    [title] NVARCHAR(300) NOT NULL,
    [slug] NVARCHAR(300) NOT NULL,
    [description] NVARCHAR(1000),
    [content] NVARCHAR(max) NOT NULL,
    [CategoryId] INT,
    [ThumbnailUrl] NVARCHAR(500),
    [VideoUrl] NVARCHAR(500),
    [difficulty] NVARCHAR(20),
    [EstimatedDuration] INT,
    [ViewCount] INT NOT NULL CONSTRAINT [Tutorials_ViewCount_df] DEFAULT 0,
    [IsPublished] BIT NOT NULL CONSTRAINT [Tutorials_IsPublished_df] DEFAULT 0,
    [IsFeatured] BIT NOT NULL CONSTRAINT [Tutorials_IsFeatured_df] DEFAULT 0,
    [tags] NVARCHAR(500),
    [MetaTitle] NVARCHAR(200),
    [MetaDescription] NVARCHAR(300),
    [CreatedBy] INT NOT NULL,
    [UpdatedBy] INT NOT NULL,
    [CreatedAt] DATETIME2 NOT NULL CONSTRAINT [Tutorials_CreatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [UpdatedAt] DATETIME2 NOT NULL,
    [PublishedAt] DATETIME2,
    CONSTRAINT [Tutorials_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Tutorials_slug_key] UNIQUE NONCLUSTERED ([slug])
);

-- CreateTable
CREATE TABLE [dbo].[TutorialSteps] (
    [id] INT NOT NULL IDENTITY(1,1),
    [TutorialId] INT NOT NULL,
    [title] NVARCHAR(300) NOT NULL,
    [content] NVARCHAR(max),
    [VideoUrl] NVARCHAR(500),
    [ImageUrl] NVARCHAR(500),
    [SortOrder] INT NOT NULL,
    [duration] INT,
    [CreatedAt] DATETIME2 NOT NULL CONSTRAINT [TutorialSteps_CreatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [UpdatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [TutorialSteps_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Media] (
    [id] INT NOT NULL IDENTITY(1,1),
    [FileName] NVARCHAR(255) NOT NULL,
    [OriginalName] NVARCHAR(255) NOT NULL,
    [MimeType] NVARCHAR(100) NOT NULL,
    [size] BIGINT NOT NULL,
    [url] NVARCHAR(500) NOT NULL,
    [ThumbnailUrl] NVARCHAR(500),
    [UploadedBy] INT NOT NULL,
    [CreatedAt] DATETIME2 NOT NULL CONSTRAINT [Media_CreatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Media_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[AuditLog] (
    [id] INT NOT NULL IDENTITY(1,1),
    [UserId] INT,
    [action] NVARCHAR(100) NOT NULL,
    [EntityType] NVARCHAR(50) NOT NULL,
    [EntityId] INT,
    [OldValues] NVARCHAR(max),
    [NewValues] NVARCHAR(max),
    [IpAddress] NVARCHAR(50),
    [UserAgent] NVARCHAR(500),
    [CreatedAt] DATETIME2 NOT NULL CONSTRAINT [AuditLog_CreatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [AuditLog_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Tutorials] ADD CONSTRAINT [Tutorials_CategoryId_fkey] FOREIGN KEY ([CategoryId]) REFERENCES [dbo].[Categories]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Tutorials] ADD CONSTRAINT [Tutorials_CreatedBy_fkey] FOREIGN KEY ([CreatedBy]) REFERENCES [dbo].[Users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Tutorials] ADD CONSTRAINT [Tutorials_UpdatedBy_fkey] FOREIGN KEY ([UpdatedBy]) REFERENCES [dbo].[Users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[TutorialSteps] ADD CONSTRAINT [TutorialSteps_TutorialId_fkey] FOREIGN KEY ([TutorialId]) REFERENCES [dbo].[Tutorials]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Media] ADD CONSTRAINT [Media_UploadedBy_fkey] FOREIGN KEY ([UploadedBy]) REFERENCES [dbo].[Users]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[AuditLog] ADD CONSTRAINT [AuditLog_UserId_fkey] FOREIGN KEY ([UserId]) REFERENCES [dbo].[Users]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
