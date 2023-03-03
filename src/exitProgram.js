import { cancel } from '@clack/prompts'

export function exitProgram ({ code = 0, message = 'Acción cancelada.' } = {}) {
  cancel(message)
  process.exit(code)
}
