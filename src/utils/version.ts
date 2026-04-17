import type { ParsedVersion, VersionLevel } from '../types'

const VERSION_REGEX = /^(\d+)\.(\d+)\.(\d+)(-[a-zA-Z0-9.-]+)?(\+[a-zA-Z0-9.-]+)?$/

export function parseVersion(version: string): ParsedVersion | null {
  const match = version.trim().match(VERSION_REGEX)
  if (!match) return null

  return {
    major: parseInt(match[1], 10),
    minor: parseInt(match[2], 10),
    patch: parseInt(match[3], 10),
    prerelease: match[4] ?? null,
    buildmetadata: match[5] ?? null,
  }
}

export function validateVersionInput(value: string): string {
  const trimmed = value.trim()
  if (!trimmed) return '请输入版本号'
  if (!VERSION_REGEX.test(trimmed)) return '格式错误，请使用 MAJOR.MINOR.PATCH 格式，例如 1.2.3'
  return ''
}

export function bumpVersion(
  current: ParsedVersion,
  level: VersionLevel
): ParsedVersion {
  if (level === 'none') return current

  if (level === 'major') {
    return {
      major: current.major + 1,
      minor: 0,
      patch: 0,
      prerelease: null,
      buildmetadata: null,
    }
  }

  if (level === 'minor') {
    return {
      major: current.major,
      minor: current.minor + 1,
      patch: 0,
      prerelease: null,
      buildmetadata: null,
    }
  }

  return {
    major: current.major,
    minor: current.minor,
    patch: current.patch + 1,
    prerelease: null,
    buildmetadata: null,
  }
}

export function formatVersion(version: ParsedVersion): string {
  let result = `${version.major}.${version.minor}.${version.patch}`
  if (version.prerelease) result += version.prerelease
  if (version.buildmetadata) result += version.buildmetadata
  return result
}

export function getVersionLevel(hasMajor: boolean, hasMinor: boolean, hasPatch: boolean): VersionLevel {
  if (hasMajor) return 'major'
  if (hasMinor) return 'minor'
  if (hasPatch) return 'patch'
  return 'none'
}
