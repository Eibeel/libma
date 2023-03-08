import { exec } from 'node:child_process'
import { promisify } from 'node:util'

const execAsync = promisify(exec)

export async function addPackageWithNpm ({ library = '' } = {}) {
  await execAsync(`npm install ${library}`)
}

export async function deletePackageWithNpm ({ library = '' } = {}) {
  await execAsync(`npm remove ${library}`)
}

export async function addPackageWithYarn ({ library = '' } = {}) {
  await execAsync(`yarn add ${library}`)
}

export async function deletePackageWithYarn ({ library = '' } = {}) {
  await execAsync(`yarn remove ${library}`)
}

export async function addPackageWithPnpm ({ library = '' } = {}) {
  await execAsync(`pnpm install ${library}`)
}

export async function deletePackageWithPnpm ({ library = '' } = {}) {
  await execAsync(`pnpm remove ${library}`)
}
