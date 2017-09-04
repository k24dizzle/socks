package main

import (
	// "encoding/json"
	"fmt"
	"net/http"
	"io/ioutil"
	"github.com/gorilla/mux"
)

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Stock: %s\n", r.URL.Path[1:])
	ticker := r
	resp, err := http.Get("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=861UONEHRY3WS509")
	if err != nil {
		println("error")
		fmt.Fprint(w, "error: %e", err)
	}
	defer resp.Body.Close()

	body, _ := ioutil.ReadAll(resp.Body)
	fmt.Fprintf(w, "result: %s", string(body))
}

func main() {
	http.HandleFunc("/", handler)
	http.ListenAndServe(":8080", nil)
}