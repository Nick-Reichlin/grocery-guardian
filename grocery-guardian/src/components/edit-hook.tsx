import { useRouter } from 'next/navigation';

export function useNavigation() {
  const router = useRouter();

  const navigateToEdit = (id: any) => {
    router.push(`/edit?id=${id}`);
  };

  return { navigateToEdit };
}
