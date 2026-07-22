-- CreateEnum
CREATE TYPE "SkillCategory" AS ENUM ('FRONTEND', 'BACKEND', 'DATABASE', 'DEVOPS', 'PRODUCT');

-- CreateEnum
CREATE TYPE "SkillLevel" AS ENUM ('FAMILIAR', 'WORKING', 'PROFICIENT');

-- CreateTable
CREATE TABLE "portfolio_profile" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "monogram" TEXT NOT NULL,
    "heroLabel" TEXT NOT NULL,
    "headline" TEXT NOT NULL,
    "shortBio" TEXT NOT NULL,
    "aboutContent" TEXT NOT NULL,
    "education" TEXT NOT NULL,
    "interests" TEXT NOT NULL,
    "workStyle" TEXT NOT NULL,
    "goals" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "location" TEXT,
    "workPrinciples" JSONB NOT NULL,
    "linkedIn" JSONB NOT NULL,
    "seoTitle" TEXT NOT NULL,
    "seoDescription" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "portfolio_profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "fullDescription" TEXT NOT NULL,
    "problem" TEXT NOT NULL,
    "contribution" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "coverUrl" TEXT,
    "repositoryUrl" TEXT,
    "liveUrl" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "technology" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "icon" TEXT,

    CONSTRAINT "technology_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_technology" (
    "projectId" TEXT NOT NULL,
    "technologyId" TEXT NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "project_technology_pkey" PRIMARY KEY ("projectId","technologyId")
);

-- CreateTable
CREATE TABLE "skill" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "SkillCategory" NOT NULL,
    "icon" TEXT,
    "level" "SkillLevel",
    "displayOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social_link" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "social_link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact_message" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "company" TEXT,
    "ipHash" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contact_message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "github_repository_selection" (
    "id" TEXT NOT NULL,
    "repoFullName" TEXT NOT NULL,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "enabled" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "github_repository_selection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "github_cache" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "fetchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "github_cache_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "project_published_displayOrder_idx" ON "project"("published", "displayOrder");

-- CreateIndex
CREATE UNIQUE INDEX "project_slug_key" ON "project"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "technology_slug_key" ON "technology"("slug");

-- CreateIndex
CREATE INDEX "project_technology_technologyId_idx" ON "project_technology"("technologyId");

-- CreateIndex
CREATE INDEX "skill_category_displayOrder_idx" ON "skill"("category", "displayOrder");

-- CreateIndex
CREATE INDEX "social_link_displayOrder_idx" ON "social_link"("displayOrder");

-- CreateIndex
CREATE INDEX "contact_message_createdAt_idx" ON "contact_message"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "github_repository_selection_repoFullName_key" ON "github_repository_selection"("repoFullName");

-- CreateIndex
CREATE INDEX "github_repository_selection_enabled_displayOrder_idx" ON "github_repository_selection"("enabled", "displayOrder");

-- CreateIndex
CREATE UNIQUE INDEX "github_cache_key_key" ON "github_cache"("key");

-- AddForeignKey
ALTER TABLE "project_technology" ADD CONSTRAINT "project_technology_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_technology" ADD CONSTRAINT "project_technology_technologyId_fkey" FOREIGN KEY ("technologyId") REFERENCES "technology"("id") ON DELETE CASCADE ON UPDATE CASCADE;
