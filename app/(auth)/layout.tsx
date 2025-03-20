const AuthLayout = ({children}:{children:React.ReactNode}) => {
    return ( 
        <div className="flex items-center justify-center h-[90%]">
            {children}
        </div>
     );
}
 
export default AuthLayout;