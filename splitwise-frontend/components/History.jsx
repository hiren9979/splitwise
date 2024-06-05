const History = () => {

    const getHistory = async () => {
        const requestOptions = {
          method: "GET",
          mode: "cors",
          headers: new Headers({
            Authorization: "Bearer your_auth_token",
            "Content-Type": "application/json",
          }),
        };
    
        try {
          const response = await fetch(`${API_BASE_URL}/auth/`, requestOptions);
          const jsonRes = await response.json();
          console.log(jsonRes);
    
          if (response.status === 200) {
            setData(jsonRes);
            if (jsonRes.status !== 404) {
              navigation.navigate("Home");
            }
          } else {
            setError("Failed to fetch data");
          }
        } catch (err) {
          setError(err.message || "Failed to fetch data");
        } finally {
          setLoading(false);
        }
      };
    
      useEffect(() => {
        getUserList();
      }, []);

    return(
        <view>History</view>
    );
}

export default History;