import * as Dialog from '@radix-ui/react-dialog'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export function NewTransactionModal() {
  const newTransactionsFormSchema = zod.object({
    description: zod.string().min(1),
    price: zod.number().min(1),
    category: zod.string().min(1),
    /* type: zod.enum(['income', 'outcome']) */
  })

  type NewTransactionsFormInputs = zod.infer<typeof newTransactionsFormSchema>

  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<NewTransactionsFormInputs>({
    resolver: zodResolver(newTransactionsFormSchema)
  })

  function handleCreateNewTransactions(data: NewTransactionsFormInputs) {
    console.log(data)
  }

 
  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Nova Transação</Dialog.Title>
        <CloseButton>
          <X size={32}/>
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewTransactions)}>
          <input 
            type='text' 
            placeholder='Descrição' 
            required
            {...register('description')}
          />
          <input 
            type='number' 
            placeholder='Preço' 
            required
            {...register('price', { valueAsNumber: true })}
          />
          <input 
            type='text' 
            placeholder='Categoria' 
            required
            {...register('category')}
          />

          <TransactionType>
            <TransactionTypeButton variant='income' value='income'>
              <ArrowCircleUp size={24} />
              Entrada
            </TransactionTypeButton>

            <TransactionTypeButton variant='outcome' value='outcome'>
              <ArrowCircleDown size={24} />
              Saída
            </TransactionTypeButton>
          </TransactionType>

          <button type='submit' disabled={isSubmitting}>Cadastrar</button>
        </form>
        
      </Content>
    </Dialog.Portal>
  )
}