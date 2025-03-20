interface SetupLayoutProp{
    children : React.ReactNode
}

const SetupLayout = ({children}:SetupLayoutProp) => {
    return ( 
    <div className="">
        {children}
    </div> 
    );
}
 
export default SetupLayout;