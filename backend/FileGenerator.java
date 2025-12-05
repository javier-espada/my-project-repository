import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

public class FileGenerator {

    public static void generateFile(String jsonLocation) throws FileNotFoundException {
        FileReader jsonFile = new FileReader(jsonLocation);
        readJSON readJson = new readJSON(jsonFile);

        if(readJson.getAction() == "Create"){
            
            fileCreate(readJson.getFilename());
            fileWrite(readJson.getFilename(),readJson.getContent());

        } else if(readJson.getAction() == "Delete"){
            
            fileDelete(readJson.getFilename());

        } else if(readJson.getAction() == "Modify"){
            
            fileDelete(readJson.getFilename());
            fileCreate(readJson.getFilename());
            fileWrite(readJson.getFilename(),readJson.getContent());

        }
    }

    // fileCreate will get a fileName and create a file with that name
    public static void fileCreate(String fileName){
        try {
            File file = new File(fileName); // Create File object
            if (file.createNewFile()) {           // Try to create the file
                System.out.println("File created: " + file.getName());
            } else {
                System.out.println("File already exists.");
            }
        } catch (IOException e) {
            System.out.println("An error occurred.");
            e.printStackTrace(); // Print error details
        }
    }

    // fileDelete will get a fileName and delete a file

    public static void fileDelete(String fileName){

        File file = new File(fileName); // Create File object
        if (file.delete()) {           // Try to delete the file
            System.out.println("File deleted: " + file.getName());
        } else {
            System.out.println("File doesn't exist.");
        }
    }
    
    public static void fileWrite(String fileName, String content){
        try {
            BufferedWriter writer = new BufferedWriter(new FileWriter(fileName));
            writer.write(content);
            writer.close();
        } catch (IOException e) {
            System.out.println("An error occurred.");
            e.printStackTrace(); // Print error details
        }
    }
}