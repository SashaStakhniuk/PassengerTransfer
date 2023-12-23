using AngleSharp.Html.Dom;
using AngleSharp.Html.Parser;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;

namespace CombineCitiesApp
{
    internal class Program
    {
        private static string FolderPath = "Datas";
        private static string FirstWordFile = $"{FolderPath}/firstCities.txt";
        private static string SecondWordFile = $"{FolderPath}/secondCities.txt";
        private static string LinkAndPathFile = $"{FolderPath}/linkAndPath.txt";
        private static string OutputPath = $"{FolderPath}/result.txt";

        static void Main(string[] args)
        {
            try
            {
                CreateDirectoryIfDoesntExist(FolderPath);
                CreateFileIfDoesntExist(FirstWordFile);
                CreateFileIfDoesntExist(SecondWordFile);
                CreateFileIfDoesntExist(LinkAndPathFile);
                CreateFileIfDoesntExist(OutputPath);

                bool stop = false;

                while(!stop)
                {
                    Console.Write("\n0 - Exit\n1 - GetContentByLink\n2 - GenerateRoutesByCities\n -> ");

                    string userInput = Console.ReadLine();

                    if (int.TryParse(userInput, out int userChoice))
                    {
                        Console.Clear();

                        switch (userChoice)
                        {
                            case 0:
                                stop = true;
                                break;

                            case 1:
                                GetDatasByLink();
                                break;

                            case 2:
                                ParseFiles();
                                break;

                            default:
                                
                                break;
                        }
                    }
                    else
                    {
                        Console.WriteLine("Invalid input. Please enter a valid number.");
                    }
                }
                
                Console.ReadKey();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex}");
            }

            Console.ReadKey();
        }

        static void ParseFiles()
        {
            string[] firstCountryCities = File.ReadAllLines(FirstWordFile);
            string[] secondCountryCities = File.ReadAllLines(SecondWordFile);

            StringBuilder stringBuilder = new StringBuilder();

            foreach (string firstCountryCity in firstCountryCities)
            {
                if (string.IsNullOrWhiteSpace(firstCountryCity))
                {
                    continue;
                }

                foreach (string secondCountryCity in secondCountryCities)
                {
                    if (string.IsNullOrWhiteSpace(secondCountryCity))
                    {
                        continue;
                    }

                    stringBuilder.Append(firstCountryCity.Trim())
                                 .Append("-")
                                 .Append(secondCountryCity.Trim())
                                 .AppendLine();
                }
            }

            WriteIntoFile(stringBuilder.ToString());
        }


        static void GetDatasByLink()
        {
            string url = string.Empty;
            string path = string.Empty;

            try
            {
                string[] lines = File.ReadAllLines(LinkAndPathFile);

                if (lines.Length >= 2)
                {
                    url = lines[0];
                    path = lines[1];
                }
                else
                {
                    Console.WriteLine($"\nERROR!!! -> File {LinkAndPathFile} does not contain enough lines.\n");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error reading the file: {ex.Message}");
            }

            if (string.IsNullOrEmpty(url) || string.IsNullOrEmpty(path))
            {
                return;
            }

            List<string> cities = new List<string>();

            using (HttpClient client = new HttpClient())
            {
                string htmlContent = client.GetStringAsync(url).Result;

                var parser = new HtmlParser();
                IHtmlDocument document = parser.ParseDocument(htmlContent);

                var cityNodes = document.QuerySelectorAll(path);

                foreach (var cityNode in cityNodes)
                {
                    string cityName = cityNode.TextContent.Trim();
                    cities.Add(cityName);
                }
            }

            if (cities?.Any() == false)
            {
                return;
            }

            StringBuilder stringBuilder = new StringBuilder();

            foreach (string city in cities)
            {
                stringBuilder.Append(city.Trim()).AppendLine();
            }

            WriteIntoFile(stringBuilder.ToString());
        }

        static void WriteIntoFile(string data)
        {
            try
            {
                using (StreamWriter writer = new StreamWriter(OutputPath))
                {
                    writer.Write(data);
                }

                Console.WriteLine($"Results have been written to {OutputPath}");
            }
            catch(Exception ex)
            {
                Console.WriteLine($"Error: {ex}");
            }
        }

        static void CreateDirectoryIfDoesntExist(string directoryPath)
        {
            if (string.IsNullOrEmpty(directoryPath))
            {
                return;
            }

            if (!Directory.Exists(directoryPath))
            {
                try
                {
                    Directory.CreateDirectory(directoryPath);
                    Console.WriteLine($"Directory {directoryPath} created successfully.");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error creating the directory {directoryPath}: {ex.Message}");
                }
            }
        }

        static void CreateFileIfDoesntExist(string filePath)
        {
            if (string.IsNullOrEmpty(filePath))
            {
                return;
            }

            if (!File.Exists(filePath))
            {
                try
                {
                    using (FileStream fs = File.Create(filePath))
                    {
                        Console.WriteLine("File created successfully.");
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error creating the file: {ex.Message}");
                }
            }
        }
    }
}
