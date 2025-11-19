import type { ContactInfo } from '@/lib/types';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

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
  InputGroupText,
} from '@/components/ui/input-group';
import { useResume } from '@/hooks/use-resume';
import { contactInfoSchema } from '@/lib/schemas';
import { SectionKey } from '@/lib/types';

export function ContactInfoForm() {
  const { getSectionData, setSectionData } = useResume();

  const form = useForm({
    resolver: zodResolver(contactInfoSchema),
    defaultValues: getSectionData(SectionKey.ContactInfo),
  });

  function onSave(values: ContactInfo) {
    console.log(values);
    setSectionData(SectionKey.ContactInfo, values);
  }

  return (
    <Form {...form}>
      <form onChange={form.handleSubmit(onSave)} className={'space-y-4'}>
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="emailAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input placeholder="example@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone number</FormLabel>
              <FormControl>
                <Input placeholder="+526641234567" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="Tijuana, Baja California, México"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="linkedin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Linkedin URL</FormLabel>
              <FormControl>
                <InputGroup>
                  <InputGroupAddon>
                    <InputGroupText>https://linkedin.com/in/</InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput
                    placeholder="Paul2G"
                    className="!pl-0.5"
                    {...field}
                  />
                </InputGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input placeholder="paul2g.dev" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
