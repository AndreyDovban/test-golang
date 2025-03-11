package main

import (
	"fmt"
	"net/http"
)

func App() http.Handler {

	router := http.NewServeMux()

	fileServer := http.FileServer(http.Dir("./dist"))
	router.Handle("/", fileServer)

	router.HandleFunc("/about", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprint(w, "About Page")
	})

	return router

}

func main() {

	app := App()

	server := &http.Server{
		Addr:    ":5000",
		Handler: app,
	}
	fmt.Print("\033[H\033[2J")
	fmt.Println("http://localhost:5000")
	server.ListenAndServe()
}
