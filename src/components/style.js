import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  // ------------------------------ Genel Stil Tanımlamaları ------------------------------
  homeScreen: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: "#040404",
  },

  // ********** HEADER ********** 
  icons: {
    height: 26,
    width: 26,
    resizeMode: 'contain',
  },
  bittiButton: {
    position: 'absolute',
    right: 58,
    verticalAlign: "middle",
    paddingVertical: 6,
    paddingHorizontal: 6,
    backgroundColor: "white",
  },
  bittiButtonText: {
    color: '#5F45FF',
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: "red"
  },

  // *********** Body *********** 
  body: {
    flex: 1,
    alignItems: 'center',
  },
  bodyTitleContainer: {
    height: 55,
    width: "100%",
    justifyContent: "center",
    paddingLeft: 15,
    //backgroundColor: "white",
  },
  bodyTitleText: {
    height: 50,
    width: "auto",
    fontWeight: "bold",
    fontSize: 40,
    color: "#5F45FF",
    justifyContent: 'center',
  },
  reminderListContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: '#040404',

  },
  alarmImageContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 15,
  },
  taskContainer: {
    width: "auto",
    marginLeft: 55,
    marginTop: 5,
    marginRight: 10,
    paddingRight: 5,
  },


  // AddTaskScreen Stil Tanımlamaları
  reminderAddContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",

  },
  // Note

  addNotesContainer: {
    width: "92%",
    backgroundColor: '#201D1D',
    marginTop: 12,
    paddingLeft: 14,
    borderRadius: 10,
    marginBottom: 20,
  },
  addTitle: {
    color: '#ffff',
    marginBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#3F3E41",
    padding: 0,
    margin: 0,
    borderWidth: 0,
    paddingVertical: 8,
    paddingHorizontal: 2,
    paddingRight: 14,
    fontSize: 15,
    textAlignVertical: 'center',
  },
  addDescription: {
    color: '#ffff',
    padding: 0,
    margin: 0,
    borderWidth: 0,
    paddingVertical: 8,
    paddingHorizontal: 2,
    paddingVertical: 8,
    fontSize: 15,
    textAlignVertical: 'top',
    minHeight: 150,
  },
  // Saat, Tarih, Hatırlatma Zamanı, Müzik
  addActiveContainer: {
    width: "92%",
    borderRadius: 10,
    backgroundColor: '#201D1D',
    flexDirection: 'column',
    justifyContent: "center",
    marginBottom: 10,
  },
  addPassiveContainer: {
    width: "92%",
    marginBottom: 10,
  },
  addContainer: {
    width: "100%",
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#201D1D',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 55,
  },
  selectionMainContainer: {
    width: "92%",
    backgroundColor: '#201D1D',
    borderTopColor: "gray",
    borderTopWidth: 1,
    height: 100,
    marginHorizontal: 15,
    alignItems: "center",
    marginTop: 2,
  },
  addImageContiner: {
    width: 32,
    height: 32,
    backgroundColor: "#5F45FF",
    borderRadius: 5,
    marginLeft: 20,
    alignItems: 'center',
    justifyContent: "center"
  },
  addIcons: {
    height: 23,
    width: 23,
    resizeMode: 'contain',
  },
  addText: {
    flex: 1,
    marginLeft: 12,
    color: 'white', 
    fontWeight: "500",
    fontSize: 16, 
  },
  switch: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
    marginVertical: 10,
    marginHorizontal: 20,
  },
  selectionContainer: {
    width: "88%",
    flexDirection: 'column',
    height: 76,
    backgroundColor: "#201D1D",
    marginVertical: 10,
    justifyContent: "center"
  },
  selection: {
    backgroundColor: "#91A2FF",
    height: 30,
    borderWidth: 1,
    borderBottomColor: "#201D1D",
    borderTopColor: "#201D1D",
    zIndex: 1,
  },





























  addContainerActive: {
    //backgroundColor: "red",
    width: "100%",
    marginTop: 0, //diğer kodu ezdik addContainer'ın altında olacak bu kod her zaman
    borderBottomWidth: 1,
    borderBottomColor: "#3F3E41",
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    width: "92%",

  },













  //düzenlenecek aşağı kısım

  containerTask: {
    width: "100%",
    marginTop: 15,
    flexDirection: 'row',
    //backgroundColor: "white",
  },
  recIconContainer: {
    //backgroundColor: "black",
    marginTop: 2,
    marginLeft: 25,
    marginRight: 2,
    height: 26,
  },
  taskCard: {
    width: "83%",
    paddingLeft: 10,
    backgroundColor: '#040404',
    borderBottomColor: "#3F3E41",
    borderBottomWidth: 2,
    paddingBottom: 10,
  },
  taskInputTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#ffff',
    marginBottom: 5,
    padding: 0,
    margin: 0,

    borderWidth: 0,
    borderRadius: 0,
    //height: 25, 
  },
  taskInputDesc: {
    fontSize: 14,
    color: '#A2A2A3',
    marginBottom: 2,
    padding: 0,
    margin: 0,
    borderWidth: 0,
    //height: 25, 
  },
  taskTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#ffff',
    marginBottom: 5,
  },
  taskDetails: {
    fontSize: 14,
    color: '#A2A2A3',
    marginBottom: 2,
  },


});

export default styles;



/*
COMPLETEDSCREEN

  // Ana tasarım aşağıdaki gibidir. Tüm ekranlarımızın standart düzeni bu şekilde olacaktır.
  homeScreen: {
    flex: 1, 
    flexDirection: 'column',
    backgroundColor: "#040404",

},

//Header Kısmının İçeriği
header: {
    width: "100%",
    flex: 0.09,
    //height: 60, 
    //alignItems: 'center', 
    justifyContent: 'center', 
    borderBottomWidth: 1, 
    borderBottomColor: '#e0e0e0', 
},
menuConatiner: {
    height: 35,
    width: 35,
    alignItems: "center",
    justifyContent: 'center',
    position: "absolute",
    left: 355,
    //backgroundColor: "red",
},
backContainer: {
    width: 120,
    height: 28,
    alignItems: 'center', 
    justifyContent: 'center', 
    flexDirection: 'row',
    //backgroundColor: "red",
},
headerTitle: {
    fontSize: 15,
    color: "#5F45FF",
    textAlign: "center",
    textAlignVertical: "center",
    //backgroundColor: "gray",
},

//Body Kısmının İçeriği
body: {
    flex: 1, 
    alignItems: 'center',
    //justifyContent: 'center', 
},

mainTitle: {
    height: 55,
    width: "100%",
    justifyContent: "center",
    paddingLeft: 25,
    //backgroundColor: "red",
},
title: {
    width: "auto",
    height: 50,
    fontWeight: "bold",
    fontSize: 40,
    color: "#5F45FF",
    //backgroundColor: "gray",
},
reminderListContainer: {

},

//Footer Kısmının içeriği

footer: {
    flex: 0.12,
    //height: 100, 
    backgroundColor: '#201D1D', 
    borderTopWidth: 1, 
    borderTopColor: '#e0e0e0', 
    //justifyContent: 'center', 

},
addReminder: {
    width: 170,
    height: 35,
    alignItems: 'center', 
    justifyContent: 'center',
    position: "absolute",
    left: 8,
    top: 13,
    flexDirection: 'row',
    //backgroundColor: "red",
},
footerText: {
    fontSize: 18,
    color: "#5F45FF",
    fontWeight: "bold",
    paddingLeft: 8,
    textAlign: "center",
    textAlignVertical: "center",
},



//Genel Stiller
icons: {
    height: 26,
    width: 26,
    resizeMode: 'contain',
    //backgroundColor:"white"
},

});
*/


/*
ADDTASKSCREEN

// Ana tasarım aşağıdaki gibidir. Tüm ekranlarımızın standart düzeni bu şekilde olacaktır.
  homeScreen: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: "#040404",

  },

  //Header Kısmının İçeriği
  header: {
    width: "100%",
    flex: 0.09,
    //height: 60, 
    //alignItems: 'center', 
    justifyContent: 'center', 
    borderBottomWidth: 1, 
    borderBottomColor: '#e0e0e0', 
  },
  menuConatiner: {
    height: 35,
    width: 35,
    alignItems: "center",
    justifyContent: 'center',
    position: "absolute",
    left: 355,
    //backgroundColor: "red",
  },
  backContainer: {
    width: 80,
    height: 28,
    alignItems: 'center', 
    justifyContent: 'center', 
    flexDirection: 'row',
    //backgroundColor: "red",
  },
  headerTitle: {
    height: 25,
    width: 55,
    fontSize: 15,
    color: "#5F45FF",
    textAlign: "center",
    textAlignVertical: "center",
    //backgroundColor: "white",
  },

  //Body Kısmının İçeriği
  body: {
    flex: 1, 
    alignItems: 'center', 
    //justifyContent: 'center', 
  },

  mainTitle: {
    height: 55,
    width: "100%",
    justifyContent: "center",
    paddingLeft: 25,
    //backgroundColor: "red",
  },
  title: {
    width: "auto",
    height: 50,
    fontWeight: "bold",
    fontSize: 40,
    color: "#5F45FF",
    //backgroundColor: "gray",
  },
  reminderListContainer: {

  },

  //Footer Kısmının içeriği

  footer: {
    flex: 0.12,
    //height: 100,
    backgroundColor: '#201D1D', 
    borderTopWidth: 1, 
    borderTopColor: '#e0e0e0', 
    //justifyContent: 'center', 

  },
  addReminder: {
    width: 100,
    height: 35,
    alignItems: 'center', 
    justifyContent: 'center', 
    position: "absolute",
    left: 20,
    top: 13,
    flexDirection: 'row',
    //backgroundColor: "red",
  },
  footerText: {
    fontSize: 18,
    color: "#5F45FF",
    fontWeight: "bold",
    paddingLeft: 8,
    textAlign: "center",
    textAlignVertical: "center",
  },

  //Genel Stiller
  icons: {
    height: 26,
    width: 26,
    resizeMode: 'contain',

    //backgroundColor:"white"
  },

  */