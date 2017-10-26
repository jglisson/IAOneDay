CREATE TABLE SurveyResult(
	SurveyResultID int IDENTITY(1,1) PRIMARY KEY,
	SurveyDateTime datetime,
	ParticipantName varchar(255),
	EmailAddress varchar(255),
	Restaurant varchar(255),
	FoodQuality int,
	ServiceQuality int,
	EnvironmentQuality int,
	Overall int,
	Comments varchar(max)
)