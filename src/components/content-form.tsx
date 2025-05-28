'use client';

import { useState } from 'react';

export default function FridgeFormModal() {
  const [isOpen, setIsOpen] = useState(false);

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   const { name, value, files } = e.target;
  //   if (name === 'photo' && files) {
  //     setFormData({ ...formData, photo: files[0] });
  //   } else {
  //     setFormData({ ...formData, [name]: value });
  //   }
  // };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log('Form data:', formData);
  //   // TODO: envoyer vers une API ou stocker l’état
  //   setIsOpen(false);
  // };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Ajouter un aliment
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Ajouter au frigo</h2>
            <form  className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  name="description"

                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Date d&quote;expiration</label>
                <input
                  type="date"
                  name="expirationDate"
  
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Date d&quote;ouverture</label>
                <input
                  type="date"
                  name="openingDate"
  
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Photo (optionnelle)</label>
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
       
                  className="w-full"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}