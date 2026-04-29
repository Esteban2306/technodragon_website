'use client';

import Stepper, { Step } from '@/src/shared/components/Stepper';
import { useState } from 'react';

import StepBasicInfo from './steps/StepBasicInfo';
import StepClassification from './steps/StepClasificatiion';
import StepVariants from './steps/StepVariants';
import StepFinished from './steps/StepFinished';
import { CreateProductForm } from './types/fromProps.types';
import StepReview from './steps/StepReview';
import { PackageCheck } from 'lucide-react';
import { useCreateProduct } from '../../hooks/useProductMutations';

type Props = {
  onFinish: () => void;
};

export default function CreateProductStepper({ onFinish }: Props) {
  const [form, setForm] = useState<CreateProductForm>({
    name: '',
    slug: '',
    description: '',

    classification: {
      brandId: '',
      categoryId: '',
    },

    images: {
      main: '',
      gallery: [],
    },

    variants: [],
  });

  const [completed, setCompleted] = useState(false);

  const [currentStep, setCurrentStep] = useState(1);

  const [maxStepReached, setMaxStepReached] = useState(1);

  const createProduct = useCreateProduct();

  const validateStep = () => {
    switch (currentStep) {
      case 1:
        return (
          form.name.trim() !== '' &&
          form.description.trim() !== '' &&
          form.images.main !== ''
        );

      case 2:
        return (
          form.classification.brandId !== '' &&
          form.classification.categoryId !== ''
        );

      case 3:
        return true;

      case 4:
        return true;

      default:
        return false;
    }
  };

  if (completed) {
    return (
      <>
        <StepFinished
          onFinish={onFinish}
          setForm={setForm}
          setCompleted={setCompleted}
        />
      </>
    );
  }

  return (
    <Stepper
      stepCircleContainerClassName="bg-[#0b0b0c] boder border-[#1a1a1a]"
      renderStepIndicator={({ step, currentStep, onStepClick }) => {
        const isAllowed = step <= maxStepReached;

        return (
          <div
            onClick={() => {
              if (!isAllowed) return;

              onStepClick(step);
            }}
            className={`
        relative
        ${isAllowed ? 'cursor-pointer' : 'cursor-not-allowed opacity-40'}
      `}
          >
            <div
              className={`
          flex h-8 w-8 items-center justify-center rounded-full
          ${
            step === currentStep
              ? 'bg-[#7a1c1c]'
              : step < currentStep
                ? 'bg-[#7a1c1c]'
                : 'bg-[#222]'
          }
        `}
            >
              {step}
            </div>
          </div>
        );
      }}
      stepContainerClassName="bg-[#0b0b0c]"
      contentClassName="text-white py-6"
      backButtonText="Volver"
      nextButtonText="Siguiente"
      footerClassName="border-t border-[#1a1a1a]"
      onStepChange={(step) => {
        setCurrentStep(step);

        if (validateStep()) {
          setMaxStepReached((prev) => Math.max(prev, step));
        }
      }}
      onFinalStepCompleted={async () => {
        const payload = {
          name: form.name,
          slug: form.name
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-'),
          description: form.description,
          brandId: form.classification.brandId,
          categoryId: form.classification.categoryId,
          isFeatured: false,

          variants: form.variants.map((v) => ({
            sku: v.sku,
            price: v.price,
            stock: v.stock,
            condition: v.condition,
            attributes: v.attributes,
          })),

          images: [
            {
              url: form.images.main,
              isMain: true,
            },
            ...form.images.gallery.map((url) => ({
              url,
              isMain: false,
            })),
          ],
        };

        console.log('payload completo:', JSON.stringify(payload));

        try {
          await createProduct.mutateAsync(payload);
          setCompleted(true);
        } catch (error) {
          console.error('Create product failed:', error);
        }
      }}
      nextButtonProps={{
        disabled: !validateStep(),
        className: `
    flex items-center gap-2 px-4 py-2 rounded-md
    ${
      validateStep()
        ? 'bg-[#7a1c1c] hover:bg-[#5c1515] cursor-pointer text-white'
        : 'bg-[#222] text-gray-500 cursor-not-allowed'
    }
  `,
        children:
          currentStep === 4 ? (
            <>
              <PackageCheck className="size-4" />
              Crear producto
            </>
          ) : (
            'Siguiente'
          ),
      }}
      backButtonProps={{
        className: 'text-gray-400 hover:text-white',
      }}
    >
      <Step>
        <StepBasicInfo form={form} setForm={setForm} />
      </Step>

      <Step>
        <StepClassification form={form} setForm={setForm} />
      </Step>

      <Step>
        <StepVariants form={form} setForm={setForm} />
      </Step>

      <Step>
        <StepReview form={form} setForm={setForm} />
      </Step>
    </Stepper>
  );
}
