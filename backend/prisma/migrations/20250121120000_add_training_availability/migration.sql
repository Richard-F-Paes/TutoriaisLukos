BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[TrainingAvailabilities] (
    [id] INT NOT NULL IDENTITY(1,1),
    [DayOfWeek] INT,
    [SpecificDate] DATE,
    [StartTime] NVARCHAR(5) NOT NULL,
    [EndTime] NVARCHAR(5) NOT NULL,
    [SlotInterval] INT NOT NULL CONSTRAINT [TrainingAvailabilities_SlotInterval_df] DEFAULT 30,
    [IsActive] BIT NOT NULL CONSTRAINT [TrainingAvailabilities_IsActive_df] DEFAULT 1,
    [CreatedAt] DATETIME2 NOT NULL CONSTRAINT [TrainingAvailabilities_CreatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [UpdatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [TrainingAvailabilities_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [TrainingAvailabilities_DayOfWeek_idx] ON [dbo].[TrainingAvailabilities]([DayOfWeek]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [TrainingAvailabilities_SpecificDate_idx] ON [dbo].[TrainingAvailabilities]([SpecificDate]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [TrainingAvailabilities_IsActive_idx] ON [dbo].[TrainingAvailabilities]([IsActive]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH



