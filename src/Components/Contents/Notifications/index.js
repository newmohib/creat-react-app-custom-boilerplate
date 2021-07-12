
import { store } from 'react-notifications-component';


export const notifications =  (notifyOptions)=>{
  return  store.addNotification({
        title: notifyOptions.title,
        message: notifyOptions.message,
        type: notifyOptions.type,
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 20000,
          onScreen: true,
          pauseOnHover: true,
          delay: 15,
          click: true,
          showIcon:true
        },
        

        //or
        // slidingExit: {
        //     duration: 1500,
        //     timingFunction: 'ease-out',
        //     delay: 15,
        //   },

      });
};

