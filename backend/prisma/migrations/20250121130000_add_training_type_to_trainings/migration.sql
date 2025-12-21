BEGIN TRY

BEGIN TRAN;

-- AlterTable - Only add column if it doesn't exist
IF NOT EXISTS (
    SELECT 1 
    FROM sys.columns 
    WHERE object_id = OBJECT_ID('dbo.Trainings') 
    AND name = 'TrainingType'
)
BEGIN
    ALTER TABLE [dbo].[Trainings] ADD [TrainingType] NVARCHAR(100);
END

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

