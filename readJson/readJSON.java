import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.*;
import java.io.IOException;
import java.io.FileReader;

public class readJSON {
    private JSONObject j;
    private String action;
    private String filename;
    private String Content;

    public readJSON(FileReader file){               // Constructor where the file is readed
        try {
            Object o = new JSONParser().parse(file);
            this.j = (JSONObject) j;
        } catch (IOException e){
            System.out.println("An error occurred");
            e.printStackTrace();
        } catch (ParseException e){
            System.out.println("An error occurred");
            e.printStackTrace();
        }
    }

    public String getAction(){                      // Return the action to be performed
        return (String) j.get("Action");
    }

    public String getFilename(){                    // Return the name of the file affected by the action
        return (String) j.get("Filename");
    }

    public String getContent(){                     // Return the content of the file
        return (String) j.get("Content");
    }
}