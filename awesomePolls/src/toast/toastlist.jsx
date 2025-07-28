import Toast from "./toast"
import light from "./toast.module.css"
import dark from "./toastdark.module.css"
import useUserContext from "../pollProvider"

const ToastList = ({ list }) => {

  const { theme } = useUserContext()
  const styles = theme ? light : dark

  return(

    <div className={styles.toastList}>

      {list.length > 0 && list.map(([toast, type], i) => (
        <Toast key={i} toast={toast} type={type} />
      ))}

    </div>

  )

}

export default ToastList
