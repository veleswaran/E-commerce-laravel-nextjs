import Footer  from '../elements/Footer.js'
import NavBar  from '../elements/NavBar.js'

const Layout =({children})=>{
    return(
        <>
        <NavBar/>
        <main style={{minHeight:"80vh"}}>
            {children}
        </main>
        <Footer />
        </>
    )
}
export default Layout;