/**
 * Validate Brazilian CPF (Cadastro de Pessoas Físicas)
 */
export function validateCPF(cpf: string): boolean {
  if (!cpf) return false
  
  // Remove non-numeric characters
  const cleanCPF = cpf.replace(/\D/g, '')
  
  // Check if has 11 digits
  if (cleanCPF.length !== 11) return false
  
  // Check if all digits are the same
  if (/^(\d)\1{10}$/.test(cleanCPF)) return false
  
  // Validate check digits
  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (10 - i)
  }
  let remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cleanCPF.charAt(9))) return false
  
  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (11 - i)
  }
  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cleanCPF.charAt(10))) return false
  
  return true
}

/**
 * Validate Brazilian CNPJ (Cadastro Nacional da Pessoa Jurídica)
 */
export function validateCNPJ(cnpj: string): boolean {
  if (!cnpj) return false
  
  // Remove non-numeric characters
  const cleanCNPJ = cnpj.replace(/\D/g, '')
  
  // Check if has 14 digits
  if (cleanCNPJ.length !== 14) return false
  
  // Check if all digits are the same
  if (/^(\d)\1{13}$/.test(cleanCNPJ)) return false
  
  // Validate first check digit
  let sum = 0
  let weight = 2
  for (let i = 11; i >= 0; i--) {
    sum += parseInt(cleanCNPJ.charAt(i)) * weight
    weight = weight === 9 ? 2 : weight + 1
  }
  let remainder = sum % 11
  const firstDigit = remainder < 2 ? 0 : 11 - remainder
  if (firstDigit !== parseInt(cleanCNPJ.charAt(12))) return false
  
  // Validate second check digit
  sum = 0
  weight = 2
  for (let i = 12; i >= 0; i--) {
    sum += parseInt(cleanCNPJ.charAt(i)) * weight
    weight = weight === 9 ? 2 : weight + 1
  }
  remainder = sum % 11
  const secondDigit = remainder < 2 ? 0 : 11 - remainder
  if (secondDigit !== parseInt(cleanCNPJ.charAt(13))) return false
  
  return true
}

/**
 * Validate Brazilian phone number
 */
export function validatePhone(phone: string): boolean {
  if (!phone) return false
  
  // Remove non-numeric characters
  const cleanPhone = phone.replace(/\D/g, '')
  
  // Check if has 10 or 11 digits (with area code)
  return cleanPhone.length === 10 || cleanPhone.length === 11
}

/**
 * Validate Brazilian CEP (postal code)
 */
export function validateCEP(cep: string): boolean {
  if (!cep) return false
  
  // Remove non-numeric characters
  const cleanCEP = cep.replace(/\D/g, '')
  
  // Check if has 8 digits
  return cleanCEP.length === 8
}

/**
 * Validate email format
 */
export function validateEmail(email: string): boolean {
  if (!email) return false
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate URL format
 */
export function validateURL(url: string): boolean {
  if (!url) return false
  
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Validate password strength
 */
export function validatePassword(password: string): {
  isValid: boolean
  score: number
  feedback: string[]
} {
  const feedback: string[] = []
  let score = 0
  
  if (!password) {
    return {
      isValid: false,
      score: 0,
      feedback: ['Senha é obrigatória']
    }
  }
  
  // Length check
  if (password.length < 8) {
    feedback.push('Senha deve ter pelo menos 8 caracteres')
  } else {
    score += 1
  }
  
  // Uppercase check
  if (!/[A-Z]/.test(password)) {
    feedback.push('Senha deve conter pelo menos uma letra maiúscula')
  } else {
    score += 1
  }
  
  // Lowercase check
  if (!/[a-z]/.test(password)) {
    feedback.push('Senha deve conter pelo menos uma letra minúscula')
  } else {
    score += 1
  }
  
  // Number check
  if (!/\d/.test(password)) {
    feedback.push('Senha deve conter pelo menos um número')
  } else {
    score += 1
  }
  
  // Special character check
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    feedback.push('Senha deve conter pelo menos um caractere especial')
  } else {
    score += 1
  }
  
  return {
    isValid: score >= 4,
    score,
    feedback
  }
}

/**
 * Format CPF
 */
export function formatCPF(cpf: string): string {
  const cleanCPF = cpf.replace(/\D/g, '')
  return cleanCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

/**
 * Format CNPJ
 */
export function formatCNPJ(cnpj: string): string {
  const cleanCNPJ = cnpj.replace(/\D/g, '')
  return cleanCNPJ.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
}

/**
 * Format phone number
 */
export function formatPhone(phone: string): string {
  const cleanPhone = phone.replace(/\D/g, '')
  
  if (cleanPhone.length === 10) {
    return cleanPhone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
  } else if (cleanPhone.length === 11) {
    return cleanPhone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  }
  
  return phone
}

/**
 * Format CEP
 */
export function formatCEP(cep: string): string {
  const cleanCEP = cep.replace(/\D/g, '')
  return cleanCEP.replace(/(\d{5})(\d{3})/, '$1-$2')
}