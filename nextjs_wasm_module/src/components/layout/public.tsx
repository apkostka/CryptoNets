export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <main className='mx-auto mt-10 w-[90%] lg:w-96'>{children}</main>
        </>
    );
}
