export interface CheckItem {
  title: string
  desc: string
  checked: boolean
}

export interface VersionParts {
  major: number
  minor: number
  patch: number
}

export interface ParsedVersion extends VersionParts {
  prerelease: string | null
  buildmetadata: string | null
}

export type VersionLevel = 'major' | 'minor' | 'patch' | 'none'
