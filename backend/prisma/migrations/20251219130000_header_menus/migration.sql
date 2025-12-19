BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[HeaderMenus] (
    [id] INT NOT NULL IDENTITY(1,1),
    [label] NVARCHAR(100) NOT NULL,
    [Order] INT NOT NULL CONSTRAINT [HeaderMenus_Order_df] DEFAULT 0,
    [CreatedAt] DATETIME2 NOT NULL CONSTRAINT [HeaderMenus_CreatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [UpdatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [HeaderMenus_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[HeaderMenuItems] (
    [id] INT NOT NULL IDENTITY(1,1),
    [HeaderMenuId] INT NOT NULL,
    [label] NVARCHAR(120) NOT NULL,
    [TutorialSlug] NVARCHAR(300),
    [Order] INT NOT NULL CONSTRAINT [HeaderMenuItems_Order_df] DEFAULT 0,
    [CreatedAt] DATETIME2 NOT NULL CONSTRAINT [HeaderMenuItems_CreatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [UpdatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [HeaderMenuItems_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[HeaderMenuItems] ADD CONSTRAINT [HeaderMenuItems_HeaderMenuId_fkey] FOREIGN KEY ([HeaderMenuId]) REFERENCES [dbo].[HeaderMenus]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH


