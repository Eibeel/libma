import { confirm, intro, isCancel, outro, select, spinner } from '@clack/prompts'
import colors from 'picocolors'
import { ACTION_PACKAGE } from './actionPackage.js'
import {
  addPackageWithNpm,
  addPackageWithPnpm,
  addPackageWithYarn,
  deletePackageWithNpm,
  deletePackageWithPnpm,
  deletePackageWithYarn
} from './execPackageManager.js'
import { exitProgram } from './exitProgram.js'
import { LIBRARIES } from './libraries.js'

intro(colors.cyan(colors.bold(`Library Manager for ${colors.blue('React')}`)))

const typePackageManager = await select({
  message: colors.yellow('Seleccione su administrador de paquetes favorito:'),
  options: [
    { value: 'npm', label: 'npm' },
    { value: 'yarn', label: 'yarn' },
    { value: 'pnpm', label: 'pnpm' }
  ]
})

if (isCancel(typePackageManager)) exitProgram()

const actionPackage = await select({
  message: colors.yellow('¿Qué desea hacer?'),
  options: Object.entries(ACTION_PACKAGE).map(([key, value]) => ({
    value: key,
    label: value.description
  }))
})

if (isCancel(actionPackage)) exitProgram()

const actionMessage = actionPackage === 'add' ? 'añadir' : 'eliminar'

const typeLibrary = await select({
  message: colors.yellow(`Seleccione la libreria que desea ${actionMessage}:`),
  options: Object.entries(LIBRARIES).map(([key, value]) => ({
    value: key,
    label: `${key.padEnd(14, ' ')}: ${value.description}`
  }))
})

if (isCancel(typeLibrary)) exitProgram()

const modifierMessage = actionPackage === 'add' ? 'instalará' : 'removerá'
const shouldContinue = await confirm({
  message: colors.yellow(`Se ${modifierMessage} la siguiente libreria: ${colors.cyan(colors.underline(typeLibrary))}, ¿Desea continuar?`),
  initialValue: false
})

if (!shouldContinue) {
  outro(colors.yellow('Instalación cancelada.'))
  process.exit(0)
}

const actionInstaller = actionPackage === 'add' ? 'Instalando' : 'Removiendo'
const loading = spinner()
loading.start(`${actionInstaller} via ${colors.yellow(typePackageManager)}`)

const { installer } = LIBRARIES[typeLibrary]
switch ((typePackageManager === 'npm' || typePackageManager === 'yarn' || typePackageManager === 'pnpm') && (actionPackage === 'add' || actionPackage === 'remove')) {
  case typePackageManager === 'npm' && actionPackage === 'add':
    await addPackageWithNpm({ library: installer })
    break
  case typePackageManager === 'npm' && actionPackage === 'remove':
    await deletePackageWithNpm({ library: installer })
    break
  case typePackageManager === 'yarn' && actionPackage === 'add':
    await addPackageWithYarn({ library: installer })
    break
  case typePackageManager === 'yarn' && actionPackage === 'remove':
    await deletePackageWithYarn({ library: installer })
    break
  case typePackageManager === 'pnpm' && actionPackage === 'add':
    await addPackageWithPnpm({ library: installer })
    break
  case typePackageManager === 'pnpm' && actionPackage === 'remove':
    await deletePackageWithPnpm({ library: installer })
    break
  default:
    break
}

const installationResult = actionPackage === 'add' ? 'añadida' : 'removida'
loading.stop(colors.yellow(`Libreria ${colors.cyan(typeLibrary)} ${installationResult}`))

outro('Todo ha salido correctamente.')
