import { useState } from 'react';
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import useAuth from '../hooks/useAuth';

export default function UpdatePasswordForm() {
    const { updatePassword } = useAuth();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const form = useForm();

    const handleUpdatePassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmNewPassword) {
            alert("Les nouveaux mots de passe ne correspondent pas");
            return;
        }

        const passwordData = { currentPassword, newPassword };

        try {
            await updatePassword(passwordData);
            alert("Mot de passe mis à jour avec succès");
        } catch (err) {
            console.error('Erreur lors de la mise à jour du mot de passe:', err);
        }
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-bold mb-4">Modifier le mot de passe</h2>
            <Form {...form}>
                <form onSubmit={handleUpdatePassword}>
                    <FormField
                        control={form.control}
                        name="currentPassword"
                        render={() => (
                            <FormItem>
                                <FormLabel>Mot de passe actuel</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        placeholder="Entrez votre mot de passe actuel"
                                        required
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="newPassword"
                        render={() => (
                            <FormItem>
                                <FormLabel>Nouveau mot de passe</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="Entrez votre nouveau mot de passe"
                                        required
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmNewPassword"
                        render={() => (
                            <FormItem>
                                <FormLabel>Confirmer le nouveau mot de passe</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        value={confirmNewPassword}
                                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                                        placeholder="Confirmez votre nouveau mot de passe"
                                        required
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="bg-blue-500 text-white mt-4">Mettre à jour le mot de passe</Button>
                </form>
            </Form>
        </div>
    );
}
