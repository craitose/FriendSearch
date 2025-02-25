{!isAuthenticated ? (
  <>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </>
) : (
  <Stack.Screen name="Main" component={MainTabs} />
)}