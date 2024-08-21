-- CreateTable
CREATE TABLE "Cv" (
    "id" SERIAL NOT NULL,
    "position" VARCHAR(200) NOT NULL,
    "full_name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "phone_numbers" VARCHAR(40),
    "about_your_self" VARCHAR(2000),
    "skills" VARCHAR(750) NOT NULL,
    "experience" VARCHAR(2000),
    "languages" VARCHAR(300) NOT NULL,
    "projects" VARCHAR(1500),
    "submitterId" INTEGER NOT NULL,

    CONSTRAINT "Cv_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cv" ADD CONSTRAINT "Cv_submitterId_fkey" FOREIGN KEY ("submitterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
