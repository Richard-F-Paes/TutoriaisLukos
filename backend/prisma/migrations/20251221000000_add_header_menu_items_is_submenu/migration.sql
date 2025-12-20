BEGIN TRY

BEGIN TRAN;

-- Add IsSubmenu column (BIT, defaults to 0/false)
ALTER TABLE [dbo].[HeaderMenuItems]
ADD [IsSubmenu] BIT NOT NULL CONSTRAINT [HeaderMenuItems_IsSubmenu_df] DEFAULT 0;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

