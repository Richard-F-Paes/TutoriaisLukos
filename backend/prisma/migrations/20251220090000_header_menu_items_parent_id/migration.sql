BEGIN TRY

BEGIN TRAN;

-- Add ParentId column to support nested submenus (self-relation)
ALTER TABLE [dbo].[HeaderMenuItems]
ADD [ParentId] INT NULL;

-- Add self-referencing FK (NO ACTION to avoid accidental cascades; menu delete still cascades via HeaderMenuId FK)
ALTER TABLE [dbo].[HeaderMenuItems]
ADD CONSTRAINT [HeaderMenuItems_ParentId_fkey]
FOREIGN KEY ([ParentId]) REFERENCES [dbo].[HeaderMenuItems]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Optional index for faster tree queries
CREATE INDEX [HeaderMenuItems_ParentId_idx] ON [dbo].[HeaderMenuItems]([ParentId]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH


