import { z } from 'zod'
import { categories } from '~/const/constants'

const defaultSchema = z.object({
  created_at: z.string(),
  description: z.string().optional(),
  amount: z.number().positive('Amount needs to be more than 0'),
})

const inComeSchema = z.object({
  type: z.literal('Income'),
})

const expenseSchema = z.object({
  type: z.literal('Expense'),
  category: z.enum(categories),
})

const investmentSchema = z.object({
  type: z.literal('Investment'),
})
const savingSchema = z.object({
  type: z.literal('Saving'),
})

export const schema = z.intersection(
  z.discriminatedUnion('type', [
    inComeSchema,
    expenseSchema,
    investmentSchema,
    savingSchema,
  ]),
  defaultSchema
)
