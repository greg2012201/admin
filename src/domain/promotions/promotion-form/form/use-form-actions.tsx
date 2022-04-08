import { navigate } from "gatsby"
import { useAdminCreateDiscount, useAdminUpdateDiscount } from "medusa-react"
import {
  PromotionFormValues,
  formValuesToCreatePromotionMapper,
  formValuesToUpdatePromotionMapper,
} from "./mappers"

export const useFormActions = (id: string, data: any) => {
  const updateDiscount = useAdminUpdateDiscount(id)
  const createDiscount = useAdminCreateDiscount()

  const onSaveAsInactive = async (values: PromotionFormValues) => {
    await createDiscount.mutateAsync(
      {
        ...formValuesToCreatePromotionMapper(values),
        ...data,
        is_disabled: true,
      },
      {
        onSuccess: () => {
          navigate("/a/promotions")
        },
      }
    )
  }

  const onSaveAsActive = async (values: PromotionFormValues) => {
    await createDiscount.mutateAsync(
      {
        ...formValuesToCreatePromotionMapper(values),
        ...data,
        is_disabled: false,
      },
      {
        onSuccess: () => {
          navigate("/a/promotions")
        },
      }
    )
  }

  const onUpdate = async (values: PromotionFormValues) => {
    await updateDiscount.mutateAsync({
      ...formValuesToUpdatePromotionMapper({
        id,
        ...data,
        ...values,
      }),
    })
  }

  return {
    onSaveAsInactive,
    onSaveAsActive,
    onUpdate,
  }
}