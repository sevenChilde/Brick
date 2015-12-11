

#ifndef __MC__StorageUtil__
#define __MC__StorageUtil__
#include <iostream>
class StorageUtil{
    
public:
    StorageUtil();
    virtual ~StorageUtil();
    static  std::string encryt(std::string& stream, const char* secret);
    static std::string  decrpt(std::string& stream, const char* secret );
    static void setItem(const char* key, const char* value );
    static std::string getItem(const char* key);
    static void removeItem(const char* key);

protected:
private:
    static std::string encryt(std::string& stream, int begin, int end, const char* secret);
    static std::string decrpt(std::string& stream, int begin, int end, const char* secret);
    static std::string XORM(std::string& stream, int begin, int end, const char* secret);
};

#endif /* defined(__MC__StorageUtil__) */
