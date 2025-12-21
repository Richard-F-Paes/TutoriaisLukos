BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[TrainingConfigurations] (
    [id] INT NOT NULL IDENTITY(1,1),
    [type] NVARCHAR(50) NOT NULL,
    [value] NVARCHAR(100) NOT NULL,
    [label] NVARCHAR(200) NOT NULL,
    [SortOrder] INT NOT NULL CONSTRAINT [TrainingConfigurations_SortOrder_df] DEFAULT 0,
    [IsActive] BIT NOT NULL CONSTRAINT [TrainingConfigurations_IsActive_df] DEFAULT 1,
    [metadata] NVARCHAR(max),
    [CreatedAt] DATETIME2 NOT NULL CONSTRAINT [TrainingConfigurations_CreatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [UpdatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [TrainingConfigurations_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [TrainingConfigurations_type_idx] ON [dbo].[TrainingConfigurations]([type]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [TrainingConfigurations_IsActive_idx] ON [dbo].[TrainingConfigurations]([IsActive]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [TrainingConfigurations_SortOrder_idx] ON [dbo].[TrainingConfigurations]([SortOrder]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
