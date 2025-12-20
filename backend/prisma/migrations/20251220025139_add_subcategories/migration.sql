BEGIN TRY

BEGIN TRAN;

-- AddColumn: Add ParentId column to Categories table
ALTER TABLE [dbo].[Categories] ADD [ParentId] INT NULL;

-- CreateIndex: Create index for better performance on hierarchical queries
CREATE NONCLUSTERED INDEX [Categories_ParentId_idx] ON [dbo].[Categories]([ParentId]);

-- AddForeignKey: Add foreign key constraint for self-referential relationship
ALTER TABLE [dbo].[Categories] ADD CONSTRAINT [Categories_ParentId_fkey] FOREIGN KEY ([ParentId]) REFERENCES [dbo].[Categories]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

