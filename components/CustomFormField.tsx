'use client'

import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { E164Number } from "libphonenumber-js/core";
import { Input } from "@/components/ui/input"
import { Control } from "react-hook-form"
import { FormFieldType } from "./forms/PatientForm"
import Image from "next/image"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";

interface CustomProps {
    control: Control<any>
    fieldType: FormFieldType,
    name: string,
    label?: string,
    placeholder?: string,
    iconSrc?: string,
    iconAlt?: string,
    disabled?: boolean,
    dateFormat?: string,
    showTimeSelect?: boolean,
    children?: React.ReactNode,
    renderSkeleton?: (field: any) => React.ReactNode
}

const RenderInput = ({ field, props }: { field: any; props: CustomProps }) => {

const {fieldType, iconSrc, iconAlt, placeholder, showTimeSelect, dateFormat, renderSkeleton} = props;

    switch (props.fieldType) {

        case FormFieldType.INPUT:
          return (
            <div className="flex rounded-md border border-dark-500 bg-dark-400">
              {props.iconSrc && (
                <Image
                  src={props.iconSrc}
                  height={24}
                  width={24}
                  alt={props.iconAlt || "icon"}
                  className="ml-2"
                />
              )}
              <FormControl>
                <Input
                  placeholder={props.placeholder}
                  {...field}
                  className="shad-input border-0"
                />
              </FormControl>
            </div>
          );

        case FormFieldType.TEXTAREA:
          return (
            <FormControl>
              <Textarea 
                placeholder={placeholder}
                {...field}
                className="shad-textArea"
                disabled={props.disabled}
              />
            </FormControl>
          );

        case FormFieldType.PHONE_INPUT:
            return(
                <FormControl>
                    <PhoneInput 
                        defaultCountry="IT"
                        placeholder={props.placeholder}
                        international
                        withCountryCallingCode
                        value={field.value as E164Number | undefined}
                        onChange={field.onChange}
                        className="input-phone"
                    />
                </FormControl>
            );

        case FormFieldType.DATE_PICKER:
          return (
            <div className="flex rounded-md border border-dark-500 bg-dark-400">
              <Image 
                src="/assets/icons/calendar.svg"
                height={24}
                width={24}
                alt="calendar"
                className="ml-2"
              />
              <FormControl>
                <DatePicker 
                  dateFormat="dd/MM/yyyy"
                  selected={field.value} 
                  onChange={(date) => field.onChange(date)} 
                  showTimeSelect={showTimeSelect ?? false}
                  timeInputLabel="Time:"
                  wrapperClassName="date-picker"
                  />
              </FormControl>
            </div>
          );

        case FormFieldType.SKELETON:
          return renderSkeleton ? renderSkeleton(field): null

        case FormFieldType.SELECT:
          return (
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="shad-select-trigger">
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="shad-select-content">
                  {props.children}
                </SelectContent>
              </Select>
            </FormControl>
          );

        case FormFieldType.CHECKBOX:
          return (
          <FormControl>
            <div className="flex items-center gap-4">
              <Checkbox 
                id={props.name}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <label htmlFor={props.name} className="checkbox-label">
                {props.label}
              </label>
            </div>
          </FormControl>
          );

        default:
            break;
    }
}

const CustomFormField = (props: CustomProps) => {

    const {control, fieldType, name, label} = props;

  return (
    <FormField
            control={control}
            name={name}
            render={({ field }) => (
            <FormItem className="flex-1">
                {fieldType !== FormFieldType.CHECKBOX && label && (
                    <FormLabel>{label}</FormLabel>
                )}
                
                <RenderInput field={field} props={props} />

                <FormMessage className="shad-error" />

            </FormItem>
            )}
        />
  )
}

export default CustomFormField
