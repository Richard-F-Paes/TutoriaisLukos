BEGIN TRY

BEGIN TRAN;

-- AlterTable - Only add column if it doesn't exist
IF NOT EXISTS (
    SELECT 1 
    FROM sys.columns 
    WHERE object_id = OBJECT_ID('dbo.TrainingAppointments') 
    AND name = 'Modality'
)
BEGIN
    ALTER TABLE [dbo].[TrainingAppointments] ADD [Modality] NVARCHAR(100);
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

