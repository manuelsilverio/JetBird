using UnityEngine;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

public class facebookManager : MonoBehaviour {
	/*
	public AudioClip buttonPress;

	#region FB.Init() example
	
	private bool isInit = false;
	
	private void CallFBInit()
	{
		FB.Init(OnInitComplete, OnHideUnity);
	}
	
	private void OnInitComplete()
	{
		Debug.Log("FB.Init completed: Is user logged in? " + FB.IsLoggedIn);
		isInit = true;
	}
	
	private void OnHideUnity(bool isGameShown)
	{
		Debug.Log("Is game showing? " + isGameShown);
	}
	
	#endregion
	
	#region FB.Login() example
	
	private void CallFBLogin()
	{
		FB.Login("email", LoginCallback);
	}
	
	void LoginCallback(FBResult result)
	{
		if (result.Error != null)
			lastResponse = "Error Response:\n" + result.Error;
			
		else if (!FB.IsLoggedIn) {
			lastResponse = "Login cancelled by Player";
		}
	}
	
	private void CallFBLogout()
	{
		FB.Logout();
	}
	#endregion
	
	#region FB.PublishInstall() example
	
	private void CallFBPublishInstall()
	{
		FB.PublishInstall(PublishComplete);
	}
	
	private void PublishComplete(FBResult result)
	{
		Debug.Log("publish response: " + result.Text);
	}
	
	#endregion
	
	#region FB.AppRequest() Friend Selector
	
	public string FriendSelectorTitle = "";
	public string FriendSelectorMessage = "Derp";
	public string FriendSelectorFilters = "[\"all\",\"app_users\",\"app_non_users\"]";
	public string FriendSelectorData = "{}";
	public string FriendSelectorExcludeIds = "";
	public string FriendSelectorMax = "";
	
	private void CallAppRequestAsFriendSelector()
	{
		// If there's a Max Recipients specified, include it
		int? maxRecipients = null;
		if (FriendSelectorMax != "")
		{
			try
			{
				maxRecipients = Int32.Parse(FriendSelectorMax);
			}
			catch (Exception e)
			{
				status = e.Message;
			}
		}
		
		// include the exclude ids
		string[] excludeIds = (FriendSelectorExcludeIds == "") ? null : FriendSelectorExcludeIds.Split(',');
		
		FB.AppRequest(
			message: FriendSelectorMessage,
			filters: FriendSelectorFilters,
			excludeIds: excludeIds,
			maxRecipients: maxRecipients,
			data: FriendSelectorData,
			title: FriendSelectorTitle,
			callback: Callback
			);
	}
	#endregion
	
	#region FB.AppRequest() Direct Request
	
	public string DirectRequestTitle = "";
	public string DirectRequestMessage = "Herp";
	private string DirectRequestTo = "";
	
	private void CallAppRequestAsDirectRequest()
	{
		if (DirectRequestTo == "")
		{
			throw new ArgumentException("\"To Comma Ids\" must be specificed", "to");
		}
		FB.AppRequest(
			message: DirectRequestMessage,
			to: DirectRequestTo.Split(','),
			title: DirectRequestTitle,
			callback: Callback
			);
	}
	
	#endregion
	

	


	

	
	#region FB.AppEvent.LogEvent example
	
	public float PlayerLevel = 1.0f;
	
	public void CallAppEventLogEvent()
	{
		var parameters = new Dictionary<string, object>();
		parameters[Facebook.FBAppEventParameterName.Level] = "Player Level";
		FB.AppEvents.LogEvent(Facebook.FBAppEventName.AchievedLevel, PlayerLevel, parameters);
		PlayerLevel++;
	}
	
	#endregion
	

	
	#region GUI
	
	private string status = "Ready";
	
	private string lastResponse = "";
	public GUIStyle textStyle = new GUIStyle();
	private Texture2D lastResponseTexture;
	
	private Vector2 scrollPosition = Vector2.zero;
	#if UNITY_IOS || UNITY_ANDROID
	int buttonHeight = 60;
	int mainWindowWidth = Screen.width - 30;
	int mainWindowFullWidth = Screen.width;
	#else
	int buttonHeight = 24;
	int mainWindowWidth = 500;
	int mainWindowFullWidth = 530;
	#endif
	
	private int TextWindowHeight
	{
		get
		{
			#if UNITY_IOS || UNITY_ANDROID
			return IsHorizontalLayout() ? Screen.height : 85;
			#else
			return Screen.height;
			#endif
		}
	}
	
	#region FB.Canvas.Pay() example
	
	public string PayProduct = "";
	
	private void CallFBPay()
	{
		FB.Canvas.Pay(PayProduct);
	}
	
	#endregion
	
	#region FB.API() example
	
	public string ApiQuery = "";
	
	private void CallFBAPI()
	{
		FB.API(ApiQuery, Facebook.HttpMethod.GET, Callback);
	}
	
	#endregion
	

	
	void Callback(FBResult result)
	{
		lastResponseTexture = null;
		if (result.Error != null)
			lastResponse = "Error Response:\n" + result.Error;
		else if (!ApiQuery.Contains("/picture"))
			lastResponse = "Success Response:\n" + result.Text;
		else
		{
			lastResponseTexture = result.Texture;
			lastResponse = "Success Response:\n";
		}
	}
	
	private IEnumerator TakeScreenshot() 
	{
		yield return new WaitForEndOfFrame();
		
		var width = Screen.width;
		var height = Screen.height;
		var tex = new Texture2D(width, height, TextureFormat.RGB24, false);
		// Read screen contents into the texture
		tex.ReadPixels(new Rect(0, 0, width, height), 0, 0);
		tex.Apply();
		byte[] screenshot = tex.EncodeToPNG();
		
		var wwwForm = new WWWForm();
		wwwForm.AddBinaryData("image", screenshot, "InteractiveConsole.png");
		wwwForm.AddField("message", "herp derp.  I did a thing!  Did I do this right?");
		
		FB.API("me/photos", Facebook.HttpMethod.POST, Callback, wwwForm);
	}
	
	private bool Button(string label)
	{
		return GUILayout.Button(
			label, 
			GUILayout.MinHeight(buttonHeight), 
			GUILayout.MaxWidth(mainWindowWidth)
			);
	}
	
	private void LabelAndTextField(string label, ref string text)
	{
		GUILayout.BeginHorizontal();
		GUILayout.Label(label, GUILayout.MaxWidth(150));
		text = GUILayout.TextField(text);
		GUILayout.EndHorizontal();
	}
	
	private bool IsHorizontalLayout()
	{
		#if UNITY_IOS || UNITY_ANDROID
		return Screen.orientation == ScreenOrientation.Landscape;
		#else
		return true;
		#endif
	}
	
	#endregion
	// Use this for initialization
	void Start () {
		CallFBInit();
		CallFBLogin();
	}
	
	// Update is called once per frame
	void Update () {
		if(Input.touchCount>0 && Input.GetTouch(0).phase == TouchPhase.Began) 										//android android android	
		{
			
			Ray ray = Camera.main.ScreenPointToRay(Input.GetTouch(0).position);	//android android android android
			RaycastHit hit;
			
			if(Physics.Raycast(ray, out hit, 100) && hit.transform.name == "Button_Facebook")							
			{
				audio.PlayOneShot(buttonPress , 1);

				if(FB.IsLoggedIn){
					CallAppRequestAsFriendSelector();
				}
			}
			else if(Physics.Raycast(ray, out hit, 100) && hit.transform.name == "Button_Facebook")							
			{
				audio.PlayOneShot(buttonPress , 1);
				CallFBLogout();
			}
			
		}
	}*/
}
