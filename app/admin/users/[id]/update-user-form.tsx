'use client'

import { insertProductSchema, updateUserSchema } from '@/lib/validators'
import { useRouter } from 'next/navigation'
import React from 'react'
import z from 'zod'
import { toast } from 'sonner'
import { ControllerRenderProps, Form, FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { USER_ROLES } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import { updateUser } from '@/lib/actions/user.actions'

const UpdateUserForm = ({ user }: {
    user: z.infer<typeof updateUserSchema>
}) => {
    const router = useRouter()
    const form = useForm<z.infer<typeof updateUserSchema>>({
        resolver: zodResolver(updateUserSchema),
        defaultValues: user
    })
    const onSubmit = async (values: z.infer<typeof updateUserSchema>) => {
        try {
            const res = await updateUser({
                ...values,
                id: user.id
            });

            if (!res.success) {
                return toast(res.message, {
                    className: "bg-red-500",
                });
            }

            toast(res.message, {
                className: "bg-green-500",
            });

            form.reset();

            router.push('/admin/users')
        } catch (error) {
            toast((error as Error).message, {
                className: "bg-red-500",
            });
        }
    }
    return (
        <div>
            <FormProvider {...form}>
                <form method='POST' onSubmit={form.handleSubmit(onSubmit)}>
                    <div>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled
                                            className="border border-black"
                                            placeholder="Enter user email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className='mt-8'>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="border border-black"
                                            placeholder="Enter user name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className='mt-8'>
                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Role</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value.toString()}>
                                        <FormControl className='border border-black'>
                                            <SelectTrigger>
                                                <SelectValue placeholder='Select a role' />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {USER_ROLES.map((role) => (
                                                <SelectItem key={role} value={role}>
                                                    {role.charAt(0).toUpperCase() + role.slice(1)}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className='flex-between mt-8'>
                        <Button type='submit' className='w-full' disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? 'Submitting...' : 'Update User'}
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}

export default UpdateUserForm
