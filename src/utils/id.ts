import { customAlphabet } from 'nanoid'

// 数字と大文字アルファベット（紛らわしいI, O, 1, 0を除く）
const alphabet = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'
const generateMemberCode = customAlphabet(alphabet, 8)

export { generateMemberCode }
