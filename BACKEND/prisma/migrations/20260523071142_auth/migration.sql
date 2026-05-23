-- CreateTable
CREATE TABLE "_CollegeToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CollegeToUser_AB_unique" ON "_CollegeToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_CollegeToUser_B_index" ON "_CollegeToUser"("B");

-- AddForeignKey
ALTER TABLE "_CollegeToUser" ADD CONSTRAINT "_CollegeToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "College"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CollegeToUser" ADD CONSTRAINT "_CollegeToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
