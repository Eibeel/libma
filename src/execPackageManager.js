import { exec } from 'node:child_process'
import { promisify } from 'node:util'

const execAsync = promisify(exec)

export async function addPackageWithNpm ({ library = '' } = {}) {
  const { stdout } = await execAsync(`npm install ${library}}`)
  return stdout
}

export async function deletePackageWithNpm ({ library = '' } = {}) {
  const { stdout } = await execAsync(`npm remove ${library}`)
  return stdout
}

export async function addPackageWithYarn ({ library = '' } = {}) {
  const { stdout } = await execAsync(`yarn add ${library}`)
  return stdout
}

export async function deletePackageWithYarn ({ library = '' } = {}) {
  const { stdout } = await execAsync(`yarn remove ${library}`)
  return stdout
}
export async function addPackageWithPnpm ({ library = '' } = {}) {
  const { stdout } = await execAsync(`pnpm install ${library}`)
  return stdout
}
export async function deletePackageWithPnpm ({ library = '' } = {}) {
  const { stdout } = await execAsync(`pnpm remove ${library}`)
  return stdout
}
