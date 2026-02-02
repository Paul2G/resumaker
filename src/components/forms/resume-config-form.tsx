import type { Locale } from '@/constants/locales';
import type { ResumeConfig } from '@/types';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { Typography } from '@/components/ui/typography';
import { dateFormats } from '@/constants/dates';
import { localeData, locales } from '@/constants/locales';
import { resumeFontFamilies, resumePaperSizes } from '@/constants/resume';
import { resumeConfigSchema } from '@/types/schemas';

export function ResumeConfigForm({
  currentConfig,
  onSave,
}: ResumeConfigFormProps) {
  const { t } = useTranslation();

  const form = useForm({
    resolver: zodResolver(resumeConfigSchema),
    defaultValues: resumeConfigSchema.parse(currentConfig),
  });

  function onSubmit(values: ResumeConfig) {
    onSave(resumeConfigSchema.parse(values));
    toast.success(t('dialogs.dataSaved'));
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        noValidate
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('resume:fields.name')}</FormLabel>
              <FormControl>
                <Input placeholder={t('resume:placeholders.name')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('resume:fields.language')}</FormLabel>
              <FormControl>
                <Combobox
                  items={locales}
                  itemToStringLabel={(item) => localeData[item].langLabel}
                  value={field.value as Locale}
                  onValueChange={(item) => field.onChange(item!)}
                >
                  <ComboboxInput
                    placeholder={t('resume:placeholders.language')}
                  />
                  <ComboboxContent>
                    <ComboboxList>
                      {(item) => (
                        <ComboboxItem key={item} value={item}>
                          {localeData[item as Locale].langLabel}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Typography variant="large">{t('resume:sheetFormat')}</Typography>
        <FormField
          control={form.control}
          name="paperSize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('resume:fields.paperSize')}</FormLabel>
              <FormControl>
                <Combobox
                  items={resumePaperSizes}
                  itemToStringLabel={(item) =>
                    t(`resume:values.paperSize.${item}`)
                  }
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <ComboboxInput
                    placeholder={t('resume:placeholders.paperSize')}
                  />
                  <ComboboxContent>
                    <ComboboxList>
                      {(item) => (
                        <ComboboxItem key={item} value={item}>
                          {t(`resume:values.paperSize.${item}`)}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="margin"
          render={({ field: { value, onChange, ...restOfProps } }) => (
            <FormItem>
              <FormLabel>{t('resume:fields.margin')}</FormLabel>
              <FormControl>
                <InputGroup>
                  <InputGroupInput
                    type="number"
                    value={value?.toString()}
                    onChange={(e) => onChange(Number(e.target.value))}
                    {...restOfProps}
                  />
                  <InputGroupAddon align="inline-end">mm</InputGroupAddon>
                </InputGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Typography variant="large">{t('resume:typography')}</Typography>
        <FormField
          control={form.control}
          name="fontFamily"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('resume:fields.fontFamily')}</FormLabel>
              <FormControl>
                <Combobox
                  items={resumeFontFamilies}
                  itemToStringLabel={(item) =>
                    t(`resume:values.fontFamily.${item}`)
                  }
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <ComboboxInput
                    placeholder={t('resume:placeholders.fontFamily')}
                  />
                  <ComboboxContent>
                    <ComboboxList>
                      {(item) => (
                        <ComboboxItem key={item} value={item}>
                          {t(`resume:values.fontFamily.${item}`)}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fontSize"
          render={({ field: { value, onChange, ...restOfProps } }) => (
            <FormItem>
              <FormLabel>{t('resume:fields.fontSize')}</FormLabel>
              <FormControl>
                <InputGroup>
                  <InputGroupInput
                    type="number"
                    value={value?.toString()}
                    onChange={(e) => onChange(Number(e.target.value))}
                    {...restOfProps}
                  />
                  <InputGroupAddon align="inline-end">pt</InputGroupAddon>
                </InputGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="titleSizeMultiplier"
          render={({ field: { value, onChange, ...restOfProps } }) => (
            <FormItem>
              <FormLabel>{t('resume:fields.titleSizeMultiplier')}</FormLabel>
              <FormControl>
                <InputGroup>
                  <InputGroupInput
                    type="number"
                    value={value?.toString()}
                    onChange={(e) => onChange(Number(e.target.value))}
                    {...restOfProps}
                  />
                  <InputGroupAddon align="inline-end">x</InputGroupAddon>
                </InputGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sectionTitleSizeMultiplier"
          render={({ field: { value, onChange, ...restOfProps } }) => (
            <FormItem>
              <FormLabel>
                {t('resume:fields.sectionTitleSizeMultiplier')}
              </FormLabel>
              <FormControl>
                <InputGroup>
                  <InputGroupInput
                    type="number"
                    value={value?.toString()}
                    onChange={(e) => onChange(Number(e.target.value))}
                    {...restOfProps}
                  />
                  <InputGroupAddon align="inline-end">x</InputGroupAddon>
                </InputGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="itemTitleMultiplier"
          render={({ field: { value, onChange, ...restOfProps } }) => (
            <FormItem>
              <FormLabel>{t('resume:fields.itemTitleMultiplier')}</FormLabel>
              <FormControl>
                <InputGroup>
                  <InputGroupInput
                    type="number"
                    value={value?.toString()}
                    onChange={(e) => onChange(Number(e.target.value))}
                    {...restOfProps}
                  />
                  <InputGroupAddon align="inline-end">x</InputGroupAddon>
                </InputGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Typography variant="large">{t('resume:spacing')}</Typography>
        <FormField
          control={form.control}
          name="sectionsGap"
          render={({ field: { value, onChange, ...restOfProps } }) => (
            <FormItem>
              <FormLabel>{t('resume:fields.sectionsGap')}</FormLabel>
              <FormControl>
                <InputGroup>
                  <InputGroupInput
                    type="number"
                    value={value?.toString()}
                    onChange={(e) => onChange(Number(e.target.value))}
                    {...restOfProps}
                  />
                  <InputGroupAddon align="inline-end">mm</InputGroupAddon>
                </InputGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="itemsTitleContentGap"
          render={({ field: { value, onChange, ...restOfProps } }) => (
            <FormItem>
              <FormLabel>{t('resume:fields.itemsTitleContentGap')}</FormLabel>
              <FormControl>
                <InputGroup>
                  <InputGroupInput
                    type="number"
                    value={value?.toString()}
                    onChange={(e) => onChange(Number(e.target.value))}
                    {...restOfProps}
                  />
                  <InputGroupAddon align="inline-end">mm</InputGroupAddon>
                </InputGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Typography variant="large">{t('resume:dates')}</Typography>
        <FormField
          control={form.control}
          name="dateFormat"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('resume:fields.dateFormat')}</FormLabel>
              <FormControl>
                <Combobox
                  items={dateFormats}
                  itemToStringLabel={(item) =>
                    t(`resume:values.dateFormat.${item}`)
                  }
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <ComboboxInput
                    placeholder={t('resume:placeholders.dateFormat')}
                  />
                  <ComboboxContent>
                    <ComboboxList>
                      {(item) => (
                        <ComboboxItem key={item} value={item}>
                          {t(`resume:values.dateFormat.${item}`)}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{t('actions.save')}</Button>
      </form>
    </Form>
  );
}

export type ResumeConfigFormProps = {
  currentConfig: ResumeConfig;
  onSave: (newConfig: ResumeConfig) => void;
};
