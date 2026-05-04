import { usePage, router } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Inquiry {
  id: number;
  reference_id: string;
  name: string;
  phone: string;
  email: string | null;
  department: string | null;
  visit_type: string | null;
  preferred_date: string | null;
  preferred_time: string | null;
  message: string | null;
  status: string;
  created_at: string;
}

interface Props {
  inquiries: Inquiry[];
}

export default function InquiriesIndex() {
  const { inquiries } = usePage<Props>().props;
  const [toast, setToast] = useState<{ show: boolean; message: string }>({ show: false, message: '' });

  const showToastMessage = (message: string) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  const updateStatus = (id: number, status: string) => {
    router.put(`/admin/inquiries/${id}/status`, { status }, {
      onSuccess: () => showToastMessage('Status updated successfully'),
    });
  };

  const destroy = (id: number) => {
    if (confirm('Are you sure you want to delete this inquiry?')) {
      router.delete(`/admin/inquiries/${id}`, {
        onSuccess: () => showToastMessage('Inquiry deleted successfully'),
      });
    }
  };

  return (
    <>
      <Head title="Inquiries" />
      
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
          {toast.message}
        </div>
      )}

      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Patient Inquiries</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Inquiries</CardTitle>
          </CardHeader>
          <CardContent>
            {inquiries.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No inquiries found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold">Ref ID</th>
                      <th className="text-left py-3 px-4 font-semibold">Name</th>
                      <th className="text-left py-3 px-4 font-semibold">Phone</th>
                      <th className="text-left py-3 px-4 font-semibold">Email</th>
                      <th className="text-left py-3 px-4 font-semibold">Department</th>
                      <th className="text-left py-3 px-4 font-semibold">Status</th>
                      <th className="text-left py-3 px-4 font-semibold">Date</th>
                      <th className="text-left py-3 px-4 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inquiries.map((inquiry) => (
                      <tr key={inquiry.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-mono text-sm">{inquiry.reference_id}</td>
                        <td className="py-3 px-4">{inquiry.name}</td>
                        <td className="py-3 px-4">{inquiry.phone}</td>
                        <td className="py-3 px-4">{inquiry.email || '-'}</td>
                        <td className="py-3 px-4">{inquiry.department || '-'}</td>
                        <td className="py-3 px-4">
                          <select
                            value={inquiry.status}
                            onChange={(e) => updateStatus(inquiry.id, e.target.value)}
                            className="text-sm border rounded px-2 py-1"
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-500">
                          {new Date(inquiry.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => destroy(inquiry.id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

InquiriesIndex.layout = {
  breadcrumbs: [
    { title: 'Dashboard', href: '/admin/dashboard' },
    { title: 'Inquiries', href: '/admin/inquiries' },
  ],
};