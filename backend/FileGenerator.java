import java.io.File;
import java.io.IOException;

public class FileGenerator {

    public static void main(String[] args) {

        readJSON readJson = new readJSON("../jsonFolder/ex1.json");

        if(readJson.getAction() == "Create"){
            
            fileCreate(readJson.getFileName());
            fileWrite(readJSon.getFileName(),readJSon.getContent());

        } else if(readJson.getAction() == "Delete"){
            
            fileDelete(readJSon.getFileName());
        }
    }

    // fileCreate will get a fileName and create a file with that name
    public void fileCreate(String fileName){
        try {
            File file = new File(filename); // Create File object
            if (file.createNewFile()) {           // Try to create the file
                System.out.println("File created: " + myObj.getName());
            } else {
                System.out.println("File already exists.");
            }
        } catch (IOException e) {
            System.out.println("An error occurred.");
            e.printStackTrace(); // Print error details
        }
    }

    // fileDelete will get a fileName and delete a file

    public void fileDelete(String fileName){
        try {
            File file = new File(filename); // Create File object
            if (file.delete()) {           // Try to delete the file
                System.out.println("File deleted: " + file.getName());
            } else {
                System.out.println("File doesn't exist.");
            }
        } catch (IOException e) {
            System.out.println("An error occurred.");
            e.printStackTrace(); // Print error details
        }
    }
    
    public void fileWrite(String fileName, String content){
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